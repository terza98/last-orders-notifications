import { useEffect, useState } from 'react';
import './App.css';
const API_URL = 'https://zbkicks.herokuapp.com/api/v1/orders/shopify_list';

function App() {
	const [orders, setOrders] = useState();
	const [activeOrder, setActiveOrder] = useState(0);

	useEffect(() => {
		fetch(API_URL, {
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then(response => response.json())
			.then(data => {
				setOrders(data);
			});
	}, []);

	useEffect(() => {
		const interval = setInterval(() => {
			if (activeOrder === orders?.orders.length) setActiveOrder(0);
			else setActiveOrder(activeOrder + 1);
		}, 5000);
		return () => clearInterval(interval);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activeOrder]);

	const calcRandomNumber = () => {
		return Math.round(Math.random() * 10);
	};

	return (
		<div className="App">
			<div id="popup">
				{orders?.orders.map(
					(order, index) =>
						activeOrder === index && (
							<div className="flex" key={index}>
								<div className="image">
									<img src={order.image} alt="orderImage" />
								</div>
								<div className="orderDetails">
									<h3 className="orderTitle">
										{`${order.user_name} in ${order.city}, ${order.state}`}
									</h3>
									<p className="orderSubtitle">
										{`Purchased ${order.product_name}`}
									</p>
									<p
										style={{ color: 'red' }}
									>{`${calcRandomNumber()} Minute Ago`}</p>
								</div>
							</div>
						),
				)}
			</div>
		</div>
	);
}

export default App;
