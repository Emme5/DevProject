import React from 'react'
import { useGetOrderByEmailQuery } from '../../../redux/features/order/ordersAPI';
import { useAuth } from '../../../context/AuthContext';
import { HashLoader } from 'react-spinners'; // Importing the loader

const OrderPage = () => {
  const {currentUser} = useAuth();
  const {data: orders=[], isLoading, isError} = useGetOrderByEmailQuery(currentUser.email);
  
  if (isLoading) return (
    <div className="flex justify-center items-center h-screen">
      <HashLoader color="#00ef15" />
    </div>
  );
  
  if (isError) return <div>Error getting orders</div>;
  return (
    <div className='container mx-auto p-6'>
      <h2 className='text-2xl font-mono mb-4'>ออเดอร์ของคุณ (สินค้าและรายละเอียดการจัดส่งจะแสดงที่นี่)</h2>
      {
        orders.length === 0 ? (<div>No Orders Found!</div>) : (<div>
          {
            orders.map((order, index) => (
              <div key={order._id} className='border-b mb-4 pb-4'>
                <p className='p-1 bg-orange-500 text-white w-10 rounded mb-1'># {index + 1}</p>
                <h2 className='font-bold'>Order ID : {order._id}</h2>
                <p className='text-gray-600 mt-2'>Name : {order.name}</p>
                <p className='text-gray-600 mt-2'>Email : {order.email}</p>
                <p className='text-gray-600 mt-2'>Phone : {order.phone}</p>
                <p className='text-gray-600 mt-2'>Total Price : ${order.totalPrice}</p>
                <h3 className='font-semibold mt-5'>Address : </h3>
                <p className='mt-2'> {order.address.city}, {order.address.state}, {order.address.country}, {order.address.zipcode}</p>
                <h3 className='font-semibold mt-5'>Products Id : </h3>
                <ul className='mt-2'>
                  {order.productIds.map((productId) => (
                    <li key={productId}>{productId}</li>
                  ))}
                </ul>
              </div>
            ))
          }
        </div>)
      }
    </div>
  )
}

export default OrderPage
