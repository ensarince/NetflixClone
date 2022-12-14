import React,{useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../features/userSlice'
import { db } from '../firebase'
import "./styles/PlanScreen.css"
import { loadStripe } from '@stripe/stripe-js'

function PlanScreen() {
    const [products, setProducts] = useState([])
    const user = useSelector(selectUser)
    const [subscription, setSubscription] = useState(null)

    //getting customer, subscription data
    useEffect(() => {
      db.collection('customers')
        .doc(user.uid)
        .collection('subscriptions')
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach(async (subscription) => {
                setSubscription({
                    role: subscription.data().role,
                    current_period_end: subscription.data().current_period_end.seconds,
                    current_period_start: subscription.data().current_period_start.seconds,
                });
            });
        });
    }, [user.uid])    

    //getting products data, synched from stripe
    useEffect(() => {
        db.collection('products')
        .where('active', '==', true )
        .get().then((querySnapshot) => {
            const products = {};
            querySnapshot.forEach(async (productDoc) => {
                products[productDoc.id] = productDoc.data();
                const priceSnap = await productDoc.ref.collection
                ('prices').get();
                priceSnap.docs.forEach((price) => {
                    products[productDoc.id].prices = {
                        priceId: price.id,
                        priceData: price.data,
                    }
                });
            });
            setProducts(products)
        });
    }, [])

    const loadCheckout = async (priceId) => {
        const docRef = await db
            .collection('customers')
            .doc(user.uid)
            .collection("checkout_sessions")
            .add({
                price: priceId,
                success_url: window.location.origin,
                cancel_url: window.location.origin,
            });
        docRef.onSnapshot(async (snap) => {
            const {error, sessionId} = snap.data()

            if(error){
                //show an error to your customer and inspect cloud functions logs
                alert(`An error ocurred:  ${error.message}`);
            }
            if(sessionId){
                //we have a session, lets redirect to Checkout
                //Init Stripe!
                const stripe = await loadStripe(process.env.REACT_APP_STRIPE_KEY_PUBLISHABLE)
                stripe.redirectToCheckout({ sessionId })
            };
        })
    }

  return (
    <div className='planScreen'>
        {subscription &&
         <p className='planScreen__renewalDate'>Renewal Date: {new Date(subscription?.current_period_end * 1000).toLocaleDateString()}</p>
        }
        {Object.entries(products).map(([productId, productData]) => {
        //the logic to check if user has a package already
        const isCurrentPackage = productData.name?.toLowerCase().includes(subscription?.role)


            return (
                <div key={productId} className={`${isCurrentPackage && "planScreen__plan--disabled" } planScreen__plans`}>
                    <div className="planScreen__info">
                        <h1>{productData.name}</h1>
                        <h6>{productData.description}</h6>
                    </div>

                    <button onClick={() => !isCurrentPackage && loadCheckout(productData?.prices?.priceId)}>
                        {isCurrentPackage ? 'Current Package' : 'Subscribe' } 
                    </button>
                </div>
            )
        })}
    </div>
  )
}

export default PlanScreen