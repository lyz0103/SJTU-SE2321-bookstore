package com.bookstore.service.serviceimpl;

import com.bookstore.service.TimerService;
import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;

@Scope(value = "session", proxyMode = ScopedProxyMode.TARGET_CLASS)
@Service
public class TimerServiceImpl implements TimerService {
    private Timestamp startTime;
    private Timestamp endTime;

    @Override
    public void start() {this.startTime = new Timestamp(System.currentTimeMillis());}

    @Override
    public void end() {this.endTime = new Timestamp(System.currentTimeMillis());}

    @Override
    public Timestamp getStartTime() {return this.startTime;}

    @Override
    public Timestamp getEndTime() {return this.endTime;}

    @Override
    public long getPeriod() {return this.endTime.getTime() - this.startTime.getTime();}
}
