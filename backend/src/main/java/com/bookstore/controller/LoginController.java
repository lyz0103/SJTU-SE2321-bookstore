package com.bookstore.controller;

import com.bookstore.entity.User;
import com.bookstore.entity.UserAuth;
import com.bookstore.service.TimerService;
import com.bookstore.service.UserService;
import com.bookstore.utils.messageUtils.Message;
import com.bookstore.utils.messageUtils.MessageUtil;
import com.bookstore.utils.sessionUtils.SessionUtil;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.sql.Timestamp;
import java.util.Map;

@RestController
public class LoginController {

    final UserService userService;
    TimerService timerService;   // prototype

    @Autowired
    LoginController(UserService userService, TimerService timerService) {
        this.userService = userService;
        this.timerService = timerService;
    }

    @RequestMapping("/login")
    public Message login(@RequestBody Map<String, String> params) {
        String username = params.get("username");
        String userPassword = params.get("userPassword");
        //check user state in session
        UserAuth userAuth = userService.checkAuth(username, userPassword);
        System.out.println("login Auth:"+ userAuth);
        if (userAuth != null) {
            User nowUser=userService.getUserById(userAuth.getUserId());
            if(!nowUser.getEnabled()) {
                return MessageUtil.createMessage(MessageUtil.LOGIN_ERROR_CODE, MessageUtil.LOGIN_BAN_MSG);
            }
            // start timer
            timerService.start();
            Timestamp loginTime = timerService.getStartTime();

            // set session
            JSONObject newSession = new JSONObject();
            newSession.put("userId", userAuth.getUserId());
            newSession.put("username", userAuth.getUsername());
            newSession.put("userType", userAuth.getUserType());
            newSession.put("loginTime", loginTime);
            SessionUtil.setSession(newSession);

            // put data into message
            JSONObject responseData = JSONObject.fromObject(userAuth);
            responseData.remove("userPassword");

            return MessageUtil.createMessage(MessageUtil.LOGIN_SUCCESS_CODE, MessageUtil.LOGIN_SUCCESS_MSG, responseData);
        } else {
            return MessageUtil.createMessage(MessageUtil.LOGIN_ERROR_CODE, MessageUtil.LOGIN_ERROR_MSG);
        }
    }

    @RequestMapping("/logout")
    public Message logout(@RequestParam("user_id") Integer userID) {
        User currentUser = userService.getUserById(userID);
        JSONObject responseData = new JSONObject();
        responseData.put("userId", currentUser.getUserId());
        responseData.put("name", currentUser.getName());

        boolean status = SessionUtil.removeSession();
        System.out.println("logout:"+status);
        if (!status) {
            return MessageUtil.createMessage(MessageUtil.LOGOUT_ERROR_CODE, MessageUtil.LOGOUT_ERROR_MSG);
        } else
            return MessageUtil.createMessage(MessageUtil.LOGOUT_SUCCESS_CODE, MessageUtil.LOGOUT_SUCCESS_MSG);
    }

}
