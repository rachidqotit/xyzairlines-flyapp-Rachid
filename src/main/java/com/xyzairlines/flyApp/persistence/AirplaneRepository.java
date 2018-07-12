package com.xyzairlines.flyApp.persistence;

import com.xyzairlines.flyApp.model.Airplane;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AirplaneRepository extends CrudRepository<Airplane, Long> {
}
