import { useParams } from "react-router-dom";
import { useAuth } from "../modules/authProvider";
import Navbar from "../modules/navbar";


function Order() {
    const auth = useAuth();
    const params = useParams();
    const order = auth?.user?.orders?.find(o => o.id?.toString() === params.toString());

    return (
    <>
        <Navbar />
        <div className='center'>
            <p>{order?.orderDate}</p>
            <p>{order?.orderStatus}</p>
            <p>{order?.orderAddress}</p>
            {order?.items && order?.items.map((item, key) => 
                <p>{item.count} {item.product.name} - £{item.costAtPurchase}</p>
            )}
            <p>£{order?.totalCost}</p>
        </div>
    </>
    );
}

export default Order;