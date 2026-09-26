#include <bits/stdc++.h>
using namespace std;

const int MAXN = 100005;

int prv_idx[MAXN], nxt_idx[MAXN];
char keys[MAXN];
int vals[MAXN];

int head = 0, tail = 1;
int node_cnt = 1; 
int max_cap;
int cur_sz = 0;         

int pos[256]; 

void Cache(int capacity) {
    max_cap = capacity;
    node_cnt = 1;
    cur_sz = 0;
    nxt_idx[head] = tail;
    prv_idx[tail] = head;
    memset(pos, 0, sizeof(pos)); 
}

void remove_node(int x) {
    nxt_idx[prv_idx[x]] = nxt_idx[x];
    prv_idx[nxt_idx[x]] = prv_idx[x];
}

void add_front(int x) {
    nxt_idx[x] = nxt_idx[head];
    prv_idx[x] = head;
    prv_idx[nxt_idx[head]] = x;
    nxt_idx[head] = x;
}

int get(char key) {
    if (!pos[key]) return -1;
    
    int x = pos[key];
    remove_node(x);
    add_front(x);
    return vals[x];
}

void put(char key, int value) {
    if (max_cap == 0) return;

    if (pos[key]) {
        int x = pos[key];
        vals[x] = value;
        remove_node(x);
        add_front(x);
    }
    else {
        int x;
        if (cur_sz == max_cap) {

            x = prv_idx[tail];
            pos[keys[x]] = 0;
            remove_node(x);
        }
        else {
            x = ++node_cnt;
            cur_sz++;
        }
        
        keys[x] = key;
        vals[x] = value;
        pos[key] = x;
        add_front(x);
    }
}


int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    Cache(2);

    put('A', 10);
    put('B', 20);
    cout << get('A') << "\n";    
    put('C', 30);
    cout << get('B') << "\n";            
    cout << get('C') << "\n";    
    cout << get('A') << "\n";    

    return 0;
}