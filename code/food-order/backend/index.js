import express from 'express';

import { registerMiddleware } from './middlewares/registerMiddleware.js';

import { readFile, writeFile, mapResult } from './infra/utilities.js';
import { DATA_PATH, ORDERS_PATH, DEFAULT_USER_ID } from './infra/constants.js';

const app = express();

registerMiddleware(app);

const getMeals = async () => {
    const result = await readFile({ path: DATA_PATH, defaultValue: [] });

    return result;
};

const getOrders = async () => {
    const orders = await readFile({ path: ORDERS_PATH, defaultValue: { data: [] } });

    return Array.isArray(orders.data) ? orders.data : [];
};

const saveOrders = async (orders) =>
    await writeFile({ path: ORDERS_PATH, value: { data: orders } });

const getOrCreateUserOrder = async (userId) => {
    const allOrders = await getOrders();

    const userOrder = allOrders.find(o => o.userId === userId);

    return userOrder ?? { userId, items: [] };
};


app.get('/meals', async (req, res) => {
    try {
        const allMeals = await getMeals();
        res.status(200).json(mapResult({
            isSucceed: true,
            data: allMeals
        }));
    } catch (ex) {
        res.status(500).json(mapResult({
            isSucceed: false,
            message: `An unhandled exception occurred!`
        }));
    }
});

app.get('/orders', async (req, res) => {
    try {
        const data = [];

        const allMeals = await getMeals();

        const order = await getOrCreateUserOrder(DEFAULT_USER_ID);

        order.items.forEach(item => {
            const foundMeal = allMeals.find(meal => meal.id === item.id);

            if (foundMeal) {
                data.push({
                    mealId: item.id,
                    quantity: item.quantity,
                    image: foundMeal.image,
                    description: foundMeal.description,
                    price: foundMeal.price,
                    name: foundMeal.name,
                });
            }
        });

        res.status(200).json(mapResult({
            isSucceed: true,
            data: data
        }));
    } catch {
        res.status(500).json(mapResult({
            isSucceed: false,
            message: 'An unhandled exception occurred!'
        }));
    }
});

app.delete('/orders/:mealId', async (req, res) => {
    try {
        const mealId = req.params.mealId;

        const orders = await getOrders();
        const userOrder = orders.find(current => current.userId == DEFAULT_USER_ID);

        if (userOrder) {
            const itemIndex = userOrder.items.findIndex(item => item.id === mealId);

            if (itemIndex === -1) {
                return res.status(400).json(mapResult({
                    isSucceed: false,
                    message: 'Could not find your order item!',
                }));
            }

            const item = userOrder.items[itemIndex];

            item.quantity > 1 ? item.quantity-- : userOrder.items.splice(itemIndex, 1);

            await saveOrders(orders);
        } else {
            return res.status(400).json(mapResult({
                isSucceed: false,
                message: 'Could not find your order!',
            }));
        }

        res.status(200).json(mapResult({
            isSucceed: true
        }));
    } catch {
        res.status(500).json(mapResult({
            isSucceed: false,
            message: 'Failed to update order'
        }));
    }
});

app.post('/orders/:mealId', async (req, res) => {
    try {
        const mealId = req.params.mealId;

        const allMeals = await getMeals();

        if (allMeals.findIndex(m => m.id == mealId) == -1) {
            return res.status(400).json(mapResult({
                isSucceed: false,
                message: 'Could not find your requested meal!',
            }));
        }

        const allOrders = await getOrders();

        let userOrder = allOrders.find(o => o.userId === DEFAULT_USER_ID);

        if (!userOrder) {
            userOrder = { userId: DEFAULT_USER_ID, items: [] };
            allOrders.push(userOrder);
        }

        const existingItem = userOrder.items.find(i => i.id === mealId);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            userOrder.items.push({ id: mealId, quantity: 1 });
        }

        await saveOrders(allOrders);

        res.status(200).json(mapResult({
            isSucceed: true
        }));
    } catch {
        res.status(500).json(mapResult({
            isSucceed: false,
            message: 'Failed to add to order'
        }));
    }
});

app.post('/finalize', async (req, res) => {
    try {
        const allOrders = await getOrders();

        const index = allOrders.findIndex(o => o.userId === DEFAULT_USER_ID);

        if (index > -1) {
            allOrders.splice(index, 1);

            await saveOrders(allOrders);
        }

        res.status(200).json(mapResult({
            isSucceed: true,
            message: 'Order finalized.'
        }));
    } catch {
        res.status(500).json(mapResult({
            isSucceed: false,
            message: 'Failed to finalize order'
        }));
    }
});

const PORT = 4001;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
