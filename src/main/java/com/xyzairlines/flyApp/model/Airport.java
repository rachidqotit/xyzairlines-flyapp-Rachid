package com.xyzairlines.flyApp.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

@Entity
public class Airport implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long Id;

    private String location;


    @OneToMany(mappedBy="airport") // person is the private Person instance var in the phone class
    @JsonIgnore
    private Set<Airplane> airplanes = new HashSet<>();

    public Set<Airplane> getAirplanes() {
        return this.airplanes;
    }

    public void addAirplane(Airplane airplane) {
        this.airplanes.add(airplane);
    }

    public long getId() {
        return Id;
    }

    public void setId(long id) {
        Id = id;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public void setAirplanes(Set<Airplane> airplanes) {
        this.airplanes = airplanes;
    }
}
