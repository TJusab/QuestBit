package com.questbit;

import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.bridge.WritableNativeMap;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;
import com.questbit.modules.QuestBit;

import java.util.LinkedHashMap;
import java.util.Map;

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
        Log.i("QUESTBIT ADDED", "Questbit with key added: " + key);
        return key;
    }

    @ReactMethod
    public String createNewQuestBit(String name, String reporter, String description, String assignee) {
        return addQuestBitToDb(new QuestBit(name, reporter, description, assignee));
    }

    @ReactMethod
    public void setValueQuestBit(QuestBit questBit, String attribute, String newValue) {
        questBit.setValue(attribute, newValue);
    }

    public String getValueQuestBit(QuestBit questBit, String attribute) {
        return questBit.getValue(attribute);
    }

    @ReactMethod
    public void getAllQuestBits(Promise promise) {
        DatabaseReference questbits = _dbReference.child("questbit");

        questbits.addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {
                WritableArray questBitsArray = new WritableNativeArray();

                for (DataSnapshot childSnapshot: dataSnapshot.getChildren()) {
                    try {
                        WritableMap questBitObject = new WritableNativeMap();
                        questBitObject.putString("assignee", childSnapshot.child("assignee").getValue(String.class));
                        questBitObject.putString("description", childSnapshot.child("description").getValue(String.class));
                        questBitObject.putString("name", childSnapshot.child("name").getValue(String.class));
                        questBitObject.putString("reporter", childSnapshot.child("reporter").getValue(String.class));

                        questBitsArray.pushMap(questBitObject);
                    } catch (Exception e) {
                        promise.reject("ERROR", e.getMessage());
                    }
                }

                promise.resolve(questBitsArray);
            }

            @Override
            public void onCancelled(DatabaseError databaseError) {
                promise.reject("ERROR", databaseError.getMessage());
            }
        });
    }
}
