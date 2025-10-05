package com.inventory.management.dto;

import com.inventory.management.model.InventoryItem;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class InventoryItemResponse {

    private Long id;
    private String name;
    private String description;
    private Integer quantity;
    private BigDecimal price;
    private String category;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public static InventoryItemResponse fromEntity(InventoryItem item) {
        return new InventoryItemResponse(
                item.getId(),
                item.getName(),
                item.getDescription(),
                item.getQuantity(),
                item.getPrice(),
                item.getCategory(),
                item.getCreatedAt(),
                item.getUpdatedAt()
        );
    }

    public InventoryItem toEntity() {
        InventoryItem item = new InventoryItem();
        item.setId(this.id);
        item.setName(this.name);
        item.setDescription(this.description);
        item.setQuantity(this.quantity);
        item.setPrice(this.price);
        item.setCategory(this.category);
        return item;
    }
}
