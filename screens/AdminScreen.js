import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

const AdminScreen = () => {
    const [order, setOrder] = useState([]);
    useEffect(() => {
        const getResponse = async () => {
            const response = await axios.get("http://192.168.0.104:5000/api/adminAuth/getOrders");
           
            setOrder(response.data)
        }

        getResponse();
    }, [])
    return (
        <View>
            {order.map(data => <>
                <Text>{data.bookName}</Text>
                {data.bookedUsers.map(order =>
                    <>
                        <Text>{order.userEmail} has booked {order.bookCount} books and paid a amount of Rs.{order.amountPaid}</Text>

                    </>

                )}
            </>
            )}
        </View>
    )
}

export default AdminScreen