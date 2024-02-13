package com.workshop.angular.controller;

import com.workshop.angular.component.UserMapper;
import com.workshop.angular.dto.UserCreationDTO;
import com.workshop.angular.dto.UserEventDTO;
import com.workshop.angular.entity.UserEvent;
import com.workshop.angular.entity.User;
import com.workshop.angular.enums.UserEventEnum;
import com.workshop.angular.repository.UserEventRepository;
import com.workshop.angular.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/training")
public class TrainingController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserEventRepository userEventRepository;

    @Autowired
    private UserMapper userMapper;

    @GetMapping("/users")
    public List<User> retrieveAllUsers() {
        return userRepository.findAll();
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<User> retrieveUser(@PathVariable("id") String id) {
        Optional<User> optionalUser = userRepository.findById(id);
        if (optionalUser.isPresent()) {
            return new ResponseEntity<>(optionalUser.get(), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping("/user")
    public User addUser(@RequestBody UserCreationDTO userCreationDTO) {
        User newUser = userRepository.insert(userMapper.toUser(userCreationDTO));
        userEventRepository.insert(userMapper.generateUserEvent(UserEventEnum.CREATE, newUser.getId(), newUser.getFirstName()));
        return newUser;
    }

    @PutMapping("/user")
    public User addUser(@RequestBody User user) {
        User newUser = userRepository.save(user);
        userEventRepository.insert(userMapper.generateUserEvent(UserEventEnum.UPDATE, newUser.getId(), newUser.getFirstName()));
        return newUser;
    }

    @DeleteMapping("/user/{id}")
    public ResponseEntity<HttpStatus> deleteUser(@PathVariable("id") String id) {
        Optional<User> optionalUser = userRepository.findById(id);
        if (optionalUser.isPresent()) {
            userRepository.deleteById(id);
            userEventRepository.insert(userMapper.generateUserEvent(UserEventEnum.DELETE, id, optionalUser.get().getFirstName()));
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/users/removeAll")
    public ResponseEntity<HttpStatus> deleteAllUsers() {
        userRepository.deleteAll();
        userEventRepository.deleteAll();
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/users/history")
    public List<UserEventDTO> getHistory() {
        return userEventRepository.findAll()
                .stream()
                .map(userEvent -> userMapper.toUserEventDTO(userEvent))
                .collect(Collectors.toList());
    }
}
