package com.questbit.modules;

import android.util.Log;

import com.questbit.State;

import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Locale;
import java.util.Map;
import java.util.Objects;

import javax.annotation.meta.Exclusive;

public class QuestBit {

    //--------------- Attributes ---------------//
    LinkedHashMap<String, Object> _info;
    private String _creationDate;

    //--------------- Constructor ---------------//
    public QuestBit(String name, String reporter) {
        _info = new LinkedHashMap<>();
        _info.put("name", name);
        _info.put("reporter", reporter);
        _info.put("description", "");
        _info.put("assignee", "");
        _info.put("dueDate", "");
        _info.put("urgency", "");
        _info.put("state", State.TO_BE_STARTED);

        SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy HH:mm", Locale.CANADA);
        Date date = new Date();
        _info.put("creation date", formatter.format(date));
    }

    //--------------- Methods ---------------//
    public Map<String, Object> toMap() {
        return _info;
    }

    public void setValue(String attribute, Object newValue) {
        switch (attribute) {
            case "name":
            case "reporter":
            case "description":
            case "assignee":
            case "dueDate":
            case "urgency":
                _info.put(attribute, newValue);
                break;
            case "state":
                if(newValue instanceof State) {
                    _info.put(attribute, newValue);
                }
                else {
                    Log.d("QuestBit", "ERROR - failed to change the attribute state");
                }
                break;
            default:
                Log.d("QuestBit", "ERROR - no attribute matches");
        }
    }

    public String getValue(String attribute) {
        if (attribute == null) {
            Log.d("QuestBit", "ERROR - invalid inputs");
            return null;
        }

        String value = null;
        switch (attribute) {
            case "name":
            case "reporter":
            case "description":
            case "assignee":
            case "dueDate":
            case "urgency":
                value = (String)_info.get(attribute);
                break;
            case "state":
                switch( (State) Objects.requireNonNull(_info.get(attribute))) {
                    case TO_BE_STARTED:
                        value = "To be started";
                        break;
                    case IN_PROGRESS:
                        value = "In progress";
                        break;
                    case ON_HOLD:
                        value = "On hold";
                        break;
                    case DONE:
                        value = "Done";
                        break;
                }
            default:
                Log.d("QuestBit", "ERROR - no attribute matches");
        }

        return value;
    }

}