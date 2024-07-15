
import { Client } from "square";
import { randomUUID } from "crypto";
import { request } from 'http';

BigInt.prototype.toJSON = function () {
  return this.toString();
};
const { paymentsApi } = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
  environment: "production",
});

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { result } = await paymentsApi.createPayment({
      idempotencyKey: randomUUID(),
      sourceId: req.body.sourceId,
      amountMoney: {
        currency: "CAD",
        amount: req.body.amount,
      },
    });
    console.log(result);
    res.status(200).json(result);
  } else {
    res.status(500).send();
  }
}
