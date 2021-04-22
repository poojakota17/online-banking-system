package com.sjsucmpe202.artemis.onlinebankingsystem.Utils;

import com.sjsucmpe202.artemis.onlinebankingsystem.entities.TransactionTemplate;
import com.sjsucmpe202.artemis.onlinebankingsystem.enums.Frequency;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
public class TransactionUtil {

    public LocalDate calculateNextTriggerDate(TransactionTemplate transactionTemplate){
        LocalDate nextDate = null;
        if(transactionTemplate.getNextTriggerDate() == null) {
            transactionTemplate.setNextTriggerDate(transactionTemplate.getStartDate());
        }
        if(transactionTemplate.getFrequency().equals(Frequency.DAILY)){
             nextDate = transactionTemplate.getNextTriggerDate().plusDays(1);
        }
        else if(transactionTemplate.getFrequency().equals(Frequency.WEEKLY)){
             nextDate = transactionTemplate.getNextTriggerDate().plusDays(7);
        }
        else if(transactionTemplate.getFrequency().equals(Frequency.MONTHLY)){
             nextDate = transactionTemplate.getNextTriggerDate().plusDays(30);
        }
        else if(transactionTemplate.getFrequency().equals(Frequency.YEARLY)){
             nextDate = transactionTemplate.getNextTriggerDate().plusDays(365);
        }
        return nextDate;
    }
}
