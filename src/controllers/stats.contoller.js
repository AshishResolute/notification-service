import { userIdSchemaForLog } from "../utils/validator/validator.js";
import { ErrorHandler } from "../ErrorHandler/globalErrorClass.js";
import db from "../db/db.js";


export const userLogs = async (req, res, next) => {
  try {
    console.log(req.params.user_id)
    const { error, value } = userIdSchemaForLog.validate(req.params);
    if (error)
      return next(
        new ErrorHandler(`Invalid params details provided`, 400, error.message),
      );

    const { user_id } = value;
    const userLogDetails = await db.query(
      `select * from delivery_logs where user_id=$1`,
      [user_id],
    );
    if (!userLogDetails.rowCount)
      return res.status(200).json({
        success: true,
        message: `User dont have any logs yet!`,
        timeStamp: new Date().toLocaleString(),
      });

    res.status(200).json({
      success: true,
      message: `userLogs fetched`,
      userLogs: userLogDetails.rows,
      timeStamp: new Date().toLocaleString(),
    });
  } catch (error) {
    console.error(`Error:${error.message}`);
    next(error);
  }
};
