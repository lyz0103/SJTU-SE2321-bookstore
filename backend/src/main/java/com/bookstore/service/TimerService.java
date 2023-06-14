package com.bookstore.service;

import java.sql.Timestamp;

public interface TimerService {

    void start();

    void end();

    Timestamp getStartTime();

    Timestamp getEndTime();

    long getPeriod();
}
