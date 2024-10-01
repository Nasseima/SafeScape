package com.example.SafeScape.services;

import java.util.List;

import com.example.SafeScape.common.EventRepository;
import com.example.SafeScape.model.Event;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EventService {

    private final EventRepository eventRepository;

    @Autowired
    public EventService(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    public List<Event> getEventsByUserId(Long userId) {
        return eventRepository.findByUserId(userId);
    }

    public Event saveEvent(Event event) {
        return eventRepository.save(event);
    }
    public void deleteEvent(Long eventId) {
        eventRepository.deleteById(eventId);
    }

}