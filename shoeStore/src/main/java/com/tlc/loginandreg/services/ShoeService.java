package com.tlc.loginandreg.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.tlc.loginandreg.models.Shoe;
import com.tlc.loginandreg.repositories.ShoeRepository;

@Service

public class ShoeService {
	private ShoeRepository shoeRepository;
	
	public ShoeService(ShoeRepository shoeRepository) {
		this.shoeRepository = shoeRepository;
	}
	
	public void destroyShoe(long id) {
		shoeRepository.delete(id);
	}
	
	public Shoe findById(Long id) {
		return shoeRepository.findById(id);
	}
	
	public void createUpdate(Shoe shoe) {
		shoeRepository.save(shoe);
	}
	
	public List<Shoe> findAll(){
		return (List<Shoe>) shoeRepository.findAll();
	}

}
