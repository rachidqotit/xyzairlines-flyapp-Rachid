package com.xyzairlines.flyApp.rest;

import com.xyzairlines.flyApp.model.Airplane;
import com.xyzairlines.flyApp.persistence.AirplaneRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/airplanes")
public class AirplaneController {

    @Autowired
    private AirplaneRepository airplaneRepository;


    @PostMapping
    public ResponseEntity<Airplane> create(@RequestBody Airplane newAirplane) {

        this.airplaneRepository.save(newAirplane);

        return new ResponseEntity<Airplane>(newAirplane, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<Iterable<Airplane>> list() {
        return new ResponseEntity<Iterable<Airplane>>(this.airplaneRepository.findAll(),
                HttpStatus.OK);
    }

    @GetMapping("{id}")
    public ResponseEntity<Airplane> findById(@PathVariable long id) {

        Optional<Airplane> result = this.airplaneRepository.findById(id);

        if (result.isPresent()) {
            return new ResponseEntity<Airplane>(result.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("{id}")
    public ResponseEntity<Airplane> updateById(@PathVariable long id, @RequestBody Airplane update) {

        Optional<Airplane> possibleVictim = this.airplaneRepository.findById(id);

        if (possibleVictim.isPresent()) {
            Airplane victim = possibleVictim.get();

            victim.setModel(update.getModel());
            victim.setPassengerCapacity(update.getPassengerCapacity());
            victim.setFuelLeft(update.getFuelLeft());
            victim.setAirport(update.getAirport());

            victim = this.airplaneRepository.save(victim);

            return new ResponseEntity<Airplane>(this.airplaneRepository.save(victim),
                    HttpStatus.OK);
        } else {
            return new ResponseEntity<Airplane>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("{id}")
    public ResponseEntity<?> deleteById(@PathVariable long id) {
        this.airplaneRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
