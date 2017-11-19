package com.tlc.loginandreg.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.tlc.loginandreg.models.Role;
import com.tlc.loginandreg.repositories.RoleRepository;

@Service
	public class RoleService {
	private RoleRepository roleRepository;
		
	public RoleService(RoleRepository roleRepository){
		this.roleRepository = roleRepository;
	}
		
	public ArrayList<Role> all(){return (ArrayList<Role>) roleRepository.findAll();}
	public void create(Role role){roleRepository.save(role);}
	public void update(Role role){roleRepository.save(role);}
	public void destroy(long id){roleRepository.delete(id);}
	public Role findByName(String name){return (Role) roleRepository.findByName(name);}
	}
