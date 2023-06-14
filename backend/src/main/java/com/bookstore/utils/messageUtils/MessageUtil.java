package com.bookstore.utils.messageUtils;

import net.sf.json.JSONObject;

public class MessageUtil {

  public static final String LOGIN_ERROR_MSG = "Not Match！Try Again!";
  public static final String LOGIN_BAN_MSG ="You have been banned！";
  public static final String LOGIN_SUCCESS_MSG = "Success！";
  public static final String ALREADY_LOGIN_MSG = "Already Login";
  public static final String NOT_LOGIN_MSG = "Not Login";
  public static final String LOGOUT_SUCCESS_MSG = "Exit successfully";
  public static final String LOGOUT_ERROR_MSG = "Exit failed";
  public static final String REGISTER_ERROR_MSG = "ID has already been registered";
  public static final String REGISTER_SUCCESS_MSG = "Registration succeeded";
  public static final String NOT_ALLOW_MSG="No Authority";


  public static final int LOGIN_ERROR_CODE = -1;
  public static final int LOGIN_SUCCESS_CODE = 1;
  public static final int NOT_LOGIN_CODE = -2;
  public static final int ALREADY_LOGIN_CODE = 0;
  public static final int LOGOUT_SUCCESS_CODE = 2;
  public static final int LOGOUT_ERROR_CODE = -3;
  public static final int REGISTER_ERROR_CODE = -4;
  public static final int REGISTER_SUCCESS_CODE = 4;
  public static final int NOT_ALLOW_CODE=5;

  public static Message createMessage(int statusCode, String message) {
    return new Message(statusCode, message);
  }

  public static Message createMessage(int statusCode, String message, JSONObject data) {
    return new Message(statusCode, message, data);
  }
}
