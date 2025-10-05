package com.inventory.management.repository;

import com.inventory.management.model.InventoryItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InventoryItemRepository extends JpaRepository<InventoryItem, Long> {

    List<InventoryItem> findByCategory(String category);

    List<InventoryItem> findByNameContainingIgnoreCase(String name);
}
