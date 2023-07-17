package com.questbit;

import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;
import com.questbit.modules.QuestBit;

import java.util.LinkedHashMap;
import java.util.Map;
import java.util.HashMap;

import javax.annotation.Nonnull;

public class DbManager extends ReactContextBaseJavaModule {

    FirebaseDatabase _firebaseDb;
    DatabaseReference _dbReference;

    DbManager(ReactApplicationContext context) {
        super(context);
        _firebaseDb = FirebaseDatabase.getInstance();
        _dbReference = _firebaseDb.getReference("DbManager");
    }

    @Override
    @Nonnull
    public String getName() {
        return "DbManager";
    }

    public String addQuestBitToDb(QuestBit questbit) {
        String key = _dbReference.child("questbit").push().getKey();;
        Map<String, Object> questBitValues = questbit.toMap();

        Map<String, Object> childUpdates = new LinkedHashMap<>();
        childUpdates.put("/questbit/" + key, questBitValues);

        _dbReference.updateChildren(childUpdates);

        return key;
    }

    @ReactMethod
    public String createNewQuestBit(String name, String reporter) {
        return addQuestBitToDb(new QuestBit(name, reporter));
    }

    @ReactMethod
    public void setValueQuestBit(QuestBit questBit, String attribute, String newValue) {
        questBit.setValue(attribute, newValue);
    }

    public String getValueQuestBit(QuestBit questBit, String attribute) {
        return questBit.getValue(attribute);
    }
}
