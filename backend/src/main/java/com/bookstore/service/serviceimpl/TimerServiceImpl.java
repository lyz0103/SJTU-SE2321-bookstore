package com.bookstore.service.serviceimpl;

import com.bookstore.service.TimerService;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;

@Service
@Scope("session")
public class TimerServiceImpl implements TimerService {

    LocalDateTime start, end;
    Duration duration;

    @Override
    public LocalDateTime startTimer() {
        start = LocalDateTime.now();
        return start;
    }

    @Override
    public Duration stopTimer() {
        end = LocalDateTime.now();
        duration = Duration.between(start, end);
        return duration;
    }
}
