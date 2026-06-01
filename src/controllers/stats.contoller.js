import {
  userIdSchemaForLog,
  userLogsPaginatedSchema,
} from "../utils/validator/validator.js";
import { ErrorHandler } from "../ErrorHandler/globalErrorClass.js";
import db from "../db/db.js";

export const userLogs = async (req, res, next) => {
  try {
    const { error, value } = userIdSchemaForLog.validate(req.params);
    if (error)
      return next(
        new ErrorHandler(`Invalid params details provided`, 400, error.message),
      );

    const { error: paginationDetailsError, value: paginationDetails } =
      userLogsPaginatedSchema.validate(req.query);
    if (paginationDetailsError)
      return next(
        new ErrorHandler(
          `Invalid query parameters recieved`,
          400,
          paginationDetailsError.message,
        ),
      );
    const { page, limit } = paginationDetails;
    const { user_id } = value;
    const offset = page * limit - limit;
    const userLogDetails = await db.query(
      `select id,event_type,channel,destination,status,attempts,logged_at from delivery_logs where user_id=$1 limit $2 offset $3`,
      [user_id, limit, offset],
    );
    if (!userLogDetails.rowCount)
      return res.status(200).json({
        success: true,
        message: `User dont have any logs yet!`,
        timeStamp: new Date().toLocaleString(),
      });

    const paginationMetaData = await db.query(
      `select count(*) as total_logs from delivery_logs where user_id=$1`,
      [user_id],
    );
    console.log(paginationMetaData)
    const totalLogs = parseInt(paginationMetaData.rows[0].total_logs);
    const totalPages = Math.ceil(totalLogs / limit);
    res.status(200).json({
      success: true,
      message: `userLogs fetched`,
      totalLogs,
      totalPages,
      currentPage: page,
      userLogs: userLogDetails.rows,
      timeStamp: new Date().toLocaleString(),
    });
  } catch (error) {
    console.error(`Error:${error.message}`);
    next(error);
  }
};
