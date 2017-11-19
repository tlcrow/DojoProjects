package com.tlc.loginandreg.controllers;

import java.security.Principal;
import java.util.Date;

import javax.validation.Valid;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.tlc.loginandreg.models.Shoe;
import com.tlc.loginandreg.models.User;
import com.tlc.loginandreg.services.RoleService;
import com.tlc.loginandreg.services.ShoeService;
import com.tlc.loginandreg.services.UserService;
import com.tlc.loginandreg.validator.UserValidator;

@Controller
public class Users {
    private UserService userService;
    private UserValidator userValidator;
    private RoleService roleService;
    private ShoeService shoeService;
    
    public Users(UserService userService, UserValidator userValidator, RoleService roleService, ShoeService shoeService) {
        this.userService = userService;
        this.userValidator = userValidator;
        this.roleService = roleService;
        this.shoeService = shoeService;
    }
    
    @RequestMapping(value={"/","/shoes"})
	public String dashboard(Principal principal,Model model){
    		User user = userService.findByUsername(principal.getName());
    		user.setUpdatedAt(new Date());
    		userService.update(user);
		model.addAttribute("currentUser",user);
		model.addAttribute("allShoes", shoeService.findAll());

		return "allShoes.jsp";
    }
    
    @RequestMapping({"/login", "/registration"})
    public String registerForm(@Valid @ModelAttribute("user") User user, @RequestParam(value="error", required=false) String error, @RequestParam(value="logout", required=false) String logout, Model model) {
    	if(error != null) {
            model.addAttribute("errorMessage", "Invalid Credentials, Please try again.");
        }
        if(logout != null) {
            model.addAttribute("logoutMessage", "Logout Successfull!");
        }
        return "registrationPage.jsp";
    }
    
    @PostMapping("/registration")
    public String registration(@Valid @ModelAttribute("user") User user, BindingResult result, Model model) {
        // NEW
        userValidator.validate(user, result);

        if (result.hasErrors()) {
            return "registrationPage.jsp";
        }
        if(userService.findByUsername(user.getUsername()) != null) {
        	 	model.addAttribute("errorMessage", "Username already exist. Please login.");
        		return "registrationPage.jsp";
        }
        if(userService.findAll().size() < 1){
        		userService.saveUserWithAdminRole(user);
        		model.addAttribute("errorMessage", "Email created. Please login.");
        		return "registrationPage.jsp";
        }
        else {
        		userService.saveWithUserRole(user);
            model.addAttribute("errorMessage", "Email created. Please login.");
            return "registrationPage.jsp";
        }
    }
    
    @RequestMapping("/dashboard")
    public String adminPage(@Valid Principal principal, Model model) {
    		
        String username = principal.getName();
        User user = userService.findByUsername(username);
        model.addAttribute("currentUser",user);
		model.addAttribute("allShoes", shoeService.findAll());
        model.addAttribute("shoe", new Shoe());
        return "dashboard.jsp";
    }
    
    @PostMapping("/shoe/add")
    public String addShoe(@Valid @ModelAttribute("shoe") Shoe shoe, BindingResult res, Principal principal, Model model, BindingResult result) {
    		
    		if (result.hasErrors()) {
            return "redirect:/dashboard";
        }
    		String username = principal.getName();
    		User user = userService.findByUsername(username);
	    shoe.setSellerEmail(user.getUsername());
	    shoe.setSellerFirst(user.getFirst());
	    shoe.setSellerLast(user.getLast());
	    shoe.setAction("Buy");
	    shoeService.createUpdate(shoe);
	    return "redirect:/dashboard";
    }
    
    @RequestMapping("/buy/{id}")
    public String buyShoe(@PathVariable("id") long id, Principal principal) {
    		String username = principal.getName();
		User user = userService.findByUsername(username);
		Shoe shoe = shoeService.findById(id);
		shoe.setBuyerEmail(user.getUsername());
		shoe.setBuyerFirst(user.getFirst());
		shoe.setBuyerLast(user.getLast());
		shoe.setAction("Bought");
		shoe.setUpdatedAt(new Date());
		shoeService.createUpdate(shoe);
		return "redirect:/dashboard";
    }
    
    @RequestMapping("/delete/{id}")
	public String delete(@PathVariable("id") long id){
		shoeService.destroyShoe(id);
		return "redirect:/dashboard";
	}
//    
    @RequestMapping("/shoe/{id}")
	public String promote(@PathVariable("id") long id, Principal principal){
    		String username = principal.getName();
    		User user = userService.findByUsername(username);
    		Shoe shoe = shoeService.findById(id);
		shoe.setUser(user);
		shoeService.createUpdate(shoe);
		return "redirect:/dashboard";
	}
    
    
}

