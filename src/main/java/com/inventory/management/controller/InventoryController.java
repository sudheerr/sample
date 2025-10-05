package com.inventory.management.controller;

import com.inventory.management.dto.InventoryItemRequest;
import com.inventory.management.dto.InventoryItemResponse;
import com.inventory.management.model.InventoryItem;
import com.inventory.management.service.InventoryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/inventory")
@RequiredArgsConstructor
public class InventoryController {

    private final InventoryService inventoryService;

    @GetMapping
    public ResponseEntity<List<InventoryItemResponse>> getAllItems() {
        List<InventoryItemResponse> items = inventoryService.getAllItems()
                .stream()
                .map(InventoryItemResponse::fromEntity)
                .collect(Collectors.toList());
        return ResponseEntity.ok(items);
    }

    @GetMapping("/{id}")
    public ResponseEntity<InventoryItemResponse> getItemById(@PathVariable Long id) {
        InventoryItem item = inventoryService.getItemById(id);
        return ResponseEntity.ok(InventoryItemResponse.fromEntity(item));
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<InventoryItemResponse>> getItemsByCategory(@PathVariable String category) {
        List<InventoryItemResponse> items = inventoryService.getItemsByCategory(category)
                .stream()
                .map(InventoryItemResponse::fromEntity)
                .collect(Collectors.toList());
        return ResponseEntity.ok(items);
    }

    @GetMapping("/search")
    public ResponseEntity<List<InventoryItemResponse>> searchItemsByName(@RequestParam String name) {
        List<InventoryItemResponse> items = inventoryService.searchItemsByName(name)
                .stream()
                .map(InventoryItemResponse::fromEntity)
                .collect(Collectors.toList());
        return ResponseEntity.ok(items);
    }

    @PostMapping
    public ResponseEntity<InventoryItemResponse> createItem(@Valid @RequestBody InventoryItemRequest request) {
        InventoryItem item = new InventoryItem();
        item.setName(request.getName());
        item.setDescription(request.getDescription());
        item.setQuantity(request.getQuantity());
        item.setPrice(request.getPrice());
        item.setCategory(request.getCategory());

        InventoryItem created = inventoryService.createItem(item);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(InventoryItemResponse.fromEntity(created));
    }

    @PutMapping("/{id}")
    public ResponseEntity<InventoryItemResponse> updateItem(
            @PathVariable Long id,
            @Valid @RequestBody InventoryItemRequest request) {

        InventoryItem itemDetails = new InventoryItem();
        itemDetails.setName(request.getName());
        itemDetails.setDescription(request.getDescription());
        itemDetails.setQuantity(request.getQuantity());
        itemDetails.setPrice(request.getPrice());
        itemDetails.setCategory(request.getCategory());

        InventoryItem updated = inventoryService.updateItem(id, itemDetails);
        return ResponseEntity.ok(InventoryItemResponse.fromEntity(updated));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteItem(@PathVariable Long id) {
        inventoryService.deleteItem(id);
        return ResponseEntity.noContent().build();
    }
}
