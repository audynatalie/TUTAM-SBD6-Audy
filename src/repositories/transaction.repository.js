const db = require("../database/pgDatabase");

exports.createTransaction = async (transaction) => {
    try {
        const res = await db.query(
            "INSERT INTO transactions (item_id, quantity, user_id, total) VALUES ($1, $2, $3, $4) RETURNING *",
            [transaction.item_id, transaction.quantity, transaction.user_id, transaction.total]
        );
        return res.rows[0];
    } catch (error) {
        console.error("Error executing query", error);
    }
};

exports.getTransactionById = async (transaction_id) => {
    console.log(transaction_id);
    try {
        const res = await db.query("SELECT * FROM transactions WHERE id = $1", [transaction_id]);
        return res.rows[0];
    } catch (error) {
        console.error("Error executing query", error);
    }
};

exports.getTransactions = async () => {
    try {
        const res = await db.query(`
            SELECT 
                t.id AS transaction_id, t.item_id, t.quantity, t.user_id, t.total, t.status, t.created_at AS transaction_created_at,
                u.id AS user_id, u.name AS user_name, u.email AS user_email, u.password AS user_password, u.balance AS user_balance, u.created_at AS user_created_at,
                i.id AS item_id, i.name AS item_name, i.price AS item_price, i.store_id AS item_store_id, i.image_url AS item_image_url, i.stock AS item_stock, i.created_at AS item_created_at
            FROM transactions t
            JOIN users u ON t.user_id = u.id
            JOIN items i ON t.item_id = i.id
        `);
        return res.rows;
    } catch (error) {
        console.error("Error executing query", error);
    }
};

exports.payTransaction = async (transaction_id) => {
    console.log(transaction_id);
    try {
        const res = await db.query(
            "UPDATE transactions SET status = 'paid' WHERE id = $1 RETURNING *",
            [transaction_id]
        );
        return res.rows[0];
    } catch (error) {
        console.error("Error executing query", error);
    }
};

exports.deleteTransaction = async (transactionId) => {
    try {
        const res = await db.query("DELETE FROM transactions WHERE id = $1 RETURNING *", [transactionId]);
        if (!res || res.rows.length === 0) {
            throw new Error("Transaction not found");
        }
        return res.rows[0];
    } catch (error) {
        console.error("Error executing query", error);
        throw error;
    }
};