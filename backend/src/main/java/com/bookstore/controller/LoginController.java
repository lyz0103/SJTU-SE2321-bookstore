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
import org.springframework.context.annotation.Scope;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.WebApplicationContext;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.Map;

@RestController
//@Scope("prototype")
@Scope("session")
public class LoginController {

    UserService userService;

    TimerService timerService;

    UserAuth userAuth;

    @Autowired
    WebApplicationContext applicationContext;

//    @Autowired
//    LoginController() {
//    }

    @RequestMapping("/login")
    public Message login(@RequestBody Map<String, String> params) {
        this.userService = applicationContext.getBean(UserService.class);
        this.timerService = applicationContext.getBean(TimerService.class);
        String username = params.get("username");
        String userPassword = params.get("userPassword");
        this.userAuth = userService.checkAuth(username, userPassword);
        System.out.println("login Auth:"+ userAuth);
        if (userAuth != null) {
            User nowUser=userService.getUserById(userAuth.getUserId());
            if(!nowUser.getEnabled())
            {
                return MessageUtil.createMessage(MessageUtil.LOGIN_ERROR_CODE, MessageUtil.LOGIN_BAN_MSG);
            }
            LocalDateTime start = timerService.startTimer();
//            System.out.println(timerService.startTimer());

            JSONObject newSession = new JSONObject();
            newSession.put("userId", userAuth.getUserId());
            newSession.put("username", userAuth.getUsername());
            newSession.put("userType", userAuth.getUserType());
            newSession.put("moment", start);
            SessionUtil.setSession(newSession);

            JSONObject responseData = JSONObject.fromObject(userAuth);
            responseData.remove("userPassword");
            responseData.put("moment", start);

            return MessageUtil.createMessage(MessageUtil.LOGIN_SUCCESS_CODE, MessageUtil.LOGIN_SUCCESS_MSG, responseData);
        } else {
            return MessageUtil.createMessage(MessageUtil.LOGIN_ERROR_CODE, MessageUtil.LOGIN_ERROR_MSG);
        }
    }

    @RequestMapping("/logout")
    public Message logout() {
        boolean status = SessionUtil.removeSession();
        System.out.println("user(" + userAuth.getUserId() + ")logout:" + status);
        Duration duration;
        if (!status) {
            return MessageUtil.createMessage(MessageUtil.LOGOUT_ERROR_CODE, MessageUtil.LOGOUT_ERROR_MSG);
        } else {
            duration = timerService.stopTimer();
            JSONObject time = new JSONObject();
            time.put("hour", (int) duration.toHours());
            time.put("minute", (int) duration.toMinutes() % 60);
            time.put("second", (int) duration.getSeconds() % 60);
            System.out.println(duration);
            System.out.println(time);
            return MessageUtil.createMessage(MessageUtil.LOGOUT_SUCCESS_CODE, MessageUtil.LOGOUT_SUCCESS_MSG, time);
        }
    }
}
