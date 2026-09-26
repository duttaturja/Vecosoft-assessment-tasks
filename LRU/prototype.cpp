#include <iostream>
#include <list>
#include <unordered_map>

class LRUCache {
private:
    int capacity;
    // Stores {key, value} pairs. Front is most recently used, back is least.
    std::list<std::pair<int, int>> cacheList;
    
    // Maps key to the corresponding node (iterator) in the list.
    std::unordered_map<int, std::list<std::pair<int, int>>::iterator> cacheMap;

public:
    LRUCache(int cap) : capacity(cap) {}

    int get(int key) {
        // If the key doesn't exist, return -1
        if (cacheMap.find(key) == cacheMap.end()) {
            return -1; 
        }
        
        // Key exists: move the accessed node to the front of the list
        // std::list::splice removes the element from its current position 
        // and inserts it at the target position in O(1) time.
        cacheList.splice(cacheList.begin(), cacheList, cacheMap[key]);
        
        return cacheMap[key]->second;
    }

    void put(int key, int value) {
        if (cacheMap.find(key) != cacheMap.end()) {
            // Key already exists: update its value and move to the front
            cacheMap[key]->second = value;
            cacheList.splice(cacheList.begin(), cacheList, cacheMap[key]);
            return;
        }

        // Key doesn't exist: check if cache is at capacity
        if (cacheList.size() == capacity) {
            // Cache is full: remove the least recently used item (at the back)
            int lruKey = cacheList.back().first;
            cacheMap.erase(lruKey);
            cacheList.pop_back();
        }

        // Insert the new key-value pair at the front of the list
        cacheList.emplace_front(key, value);
        // Record its position in the map
        cacheMap[key] = cacheList.begin();
    }
};