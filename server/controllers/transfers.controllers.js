// Models
const { Transfer } = require("../models/transfer.model");
const { User } = require("../models/user.model");

// Utils
const { catchAsync } = require("../utils/catchAsync");
const { AppError } = require("../utils/appError");

const sendTransfer = catchAsync(async (req, res, next) => {
  const { senderAccount, receiverAccount, amount } = req.body;

  const receiverAccountUser = await User.findOne({
    where: {
      accountNumber: receiverAccount,
      status: "active",
    },
  });

  if (!receiverAccountUser) {
    return next(
      new AppError(404, "Can't find account with the given account number")
    );
  }

  const senderAccountUser = await User.findOne({
    where: {
      accountNumber: senderAccount,
      status: "active",
    },
  });

  if (senderAccountUser.amount <= 0 || senderAccountUser.amount - amount < 0) {
    return next(
      new AppError(404, "You don't have enough balance for this operation")
    );
  }

  const discountedAmount = senderAccountUser.amount - amount;
  const creditedAmount = receiverAccountUser.amount + amount;

  await senderAccountUser.update({
    amount: discountedAmount,
  });

  await receiverAccountUser.update({
    amount: creditedAmount,
  });

  const newTransfer = await Transfer.create({
    amount,
    senderUserId: senderAccountUser.id,
    receiverUserId: receiverAccountUser.id,
  });

  res.status(200).json({
    newTransfer,
  });
});

module.exports = { sendTransfer };
