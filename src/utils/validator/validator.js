import joi from "joi";

export const subcriberSchema = joi.object({
  user_id: joi.number().positive().required().messages({
    "any.required": "user_id is required",
    "number.base": "user_id must be a number",
    "number.positive": `user_id cannot be negative`,
  }),
  event_type: joi
    .string()
    .trim()
    .lowercase()
    .min(3)
    .max(28)
    .required()
    .messages({
      "string.min": "event_type must be atleast 3 characters long",
      "string.max": "event_type cannot be more than 28 characters",
      "any.required": `event_type is required`,
      "string.empty": `event_type cannot be empty`,
    }),
  channel: joi
    .string()
    .trim()
    .valid("email", "phone", "webhook")
    .required()
    .messages({
      "any.only": "Valid channels are email,phone and webhook",
      "string.empty": `channel cannot be empty,value needed!`,
      "any.required": `channel is required`,
    }),
  destination: joi
    .string()
    .trim()
    .required()
    .messages({
      "any.required": `destination is required`,
      "string.empty": "destination cannot be empty",
    })
    .when("channel", {
      is: "email",
      then: joi.string().email().messages({
        "string.email": `Invalid email Provided`,
      }),
    })
    .when("channel", {
      is: "phone",
      then: joi
        .string()
        .pattern(/^[0-9]{10}$/)
        .messages({
          "string.pattern.base":
            "phone number must contain digits and must be 10 characters long",
        }),
    })
    .when("channel", {
      is: "webhook",
      then: joi.string().uri().messages({
        "string.uri": `webhook must be an valid url`,
      }),
    }),
  condition: joi.object().optional(),
});

export const eventSchema = joi.object({
  event_type: joi
    .string()
    .trim()
    .lowercase()
    .min(3)
    .max(28)
    .required()
    .messages({
      "any.required": `event_type value is required!`,
      "string.min": `event type must have atleast 3 characters`,
      "string.max": `event_type cannot be more than 28 characters`,
      "string.empty": `event_type must have a value,cannot be empty`,
    }),
  user_id: joi.number().positive().required().messages({
    "any.required": `user_id is required`,
    "number.base": `user_id must be a number`,
    "number.positive": `user_id must be positive`,
  }),
});

export const userIdSchemaForLog = joi.object({
  user_id: joi.number().positive().required().messages({
    "any.required": `user_id is required!`,
    "number.positive": `Invalid user_id recieved`,
    "number.base": `user_id must be a number`,
  }),
});
