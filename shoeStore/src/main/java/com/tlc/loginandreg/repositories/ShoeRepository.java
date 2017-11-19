package com.tlc.loginandreg.repositories;

import java.util.List;
import org.springframework.stereotype.Repository;
import org.springframework.data.repository.CrudRepository;

import com.tlc.loginandreg.models.Shoe;

@Repository

public interface ShoeRepository extends CrudRepository<Shoe, Long>{
	
	List<Shoe> findAll();
	
	Shoe findById(Long id);

}
