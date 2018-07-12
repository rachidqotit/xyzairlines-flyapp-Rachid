package com.xyzairlines.flyApp.rest;

import com.xyzairlines.flyApp.model.Airplane;
import com.xyzairlines.flyApp.model.Airport;
import com.xyzairlines.flyApp.persistence.AirplaneRepository;
import com.xyzairlines.flyApp.persistence.AirportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("api/airports")
public class AirportController {


    @Autowired
    private AirportRepository airportRepository;

    @Autowired
    private AirplaneRepository airplaneRepository;


    @PostMapping
    public ResponseEntity<Airport> create(@RequestBody Airport newAirport) {

        Airport airport = new Airport();
        airport.setLocation(newAirport.getLocation());

        this.airportRepository.save(airport);


        for (Airplane airplane : newAirport.getAirplanes()) {
            Optional<Airplane> optionalAirplane = this.airplaneRepository.findById(airplane.getId());

            if (optionalAirplane.isPresent()) {
                Airplane foundAirplane = optionalAirplane.get();
                airport.addAirplane(foundAirplane);

                this.airplaneRepository.save(foundAirplane);

            }

            this.airportRepository.save(airport);


        }



        return new ResponseEntity<Airport>(airport, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<Iterable<Airport>> list() {
        return new ResponseEntity<Iterable<Airport>>(this.airportRepository.findAll(),
                HttpStatus.OK);
    }

    @GetMapping("{id}")
    public ResponseEntity<Airport> findById(@PathVariable long id) {

        Optional<Airport> result = this.airportRepository.findById(id);

        if (result.isPresent()) {
            return new ResponseEntity<Airport>(result.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("{id}")
    public ResponseEntity<Airport> updateById(@PathVariable long id, @RequestBody Airport update) {

        Optional<Airport> possibleAirport = this.airportRepository.findById(id);

        if (possibleAirport.isPresent()) {
            Airport victim = possibleAirport.get();

            victim.setLocation(update.getLocation());

            victim = this.airportRepository.save(victim);

            for (Airplane airplane : update.getAirplanes()) {

                if (!update.getAirplanes().contains(airplane)) {
                    update.addAirplane(airplane);
                }
            }

            return new ResponseEntity<Airport>(this.airportRepository.save(victim),
                    HttpStatus.OK);
        } else {
            return new ResponseEntity<Airport>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("{id}")
    public ResponseEntity<?> deleteById(@PathVariable long id) {
        this.airportRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
