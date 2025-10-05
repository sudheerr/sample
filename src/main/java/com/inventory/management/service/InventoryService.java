package com.inventory.management.service;

import com.inventory.management.exception.ResourceNotFoundException;
import com.inventory.management.model.InventoryItem;
import com.inventory.management.repository.InventoryItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class InventoryService {

    private final InventoryItemRepository repository;

    public List<InventoryItem> getAllItems() {
        return repository.findAll();
    }

    public InventoryItem getItemById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("InventoryItem", id));
    }

    public List<InventoryItem> getItemsByCategory(String category) {
        return repository.findByCategory(category);
    }

    public List<InventoryItem> searchItemsByName(String name) {
        return repository.findByNameContainingIgnoreCase(name);
    }

    @Transactional
    public InventoryItem createItem(InventoryItem item) {
        return repository.save(item);
    }

    @Transactional
    public InventoryItem updateItem(Long id, InventoryItem itemDetails) {
        InventoryItem item = getItemById(id);

        item.setName(itemDetails.getName());
        item.setDescription(itemDetails.getDescription());
        item.setQuantity(itemDetails.getQuantity());
        item.setPrice(itemDetails.getPrice());
        item.setCategory(itemDetails.getCategory());

        return repository.save(item);
    }

    @Transactional
    public void deleteItem(Long id) {
        InventoryItem item = getItemById(id);
        repository.delete(item);
    }
}
