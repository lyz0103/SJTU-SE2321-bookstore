package com.bookstore.service;

import java.time.Duration;
import java.time.LocalDateTime;

public interface TimerService {

    LocalDateTime startTimer();

    Duration stopTimer();

}
