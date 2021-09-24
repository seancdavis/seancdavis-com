---
title: How To Reverse a Ruby Hash
tags:
  - ruby
description: It's nice and easy to reverse a ruby array. See how to easily convert a hash as well.
---

It's easy to reverse a Ruby array.

```ruby
a = %w{ red blue green }
# => ["red", "blue", "green"]

a.reverse
# => ["green", "blue", "red"]
```

But it's not as straightforward with a hash. We have to convert it to an array, reverse it, and send it back to a hash. This works for nested hashes as well.

```ruby
my_hash = {
  :key_1 => 1,
  :key_2 => 2,
  :key_3 => [1, 2, 3],
  :key_4 => {
    :subkey_1 => 1,
    :subkey_2 => 2
  }
}
# => {:key_1=>1, :key_2=>2, :key_3=>[1, 2, 3], :key_4=>{:subkey_1=>1, :subkey_2=>2}}

new_hash = Hash[my_hash.to_a.reverse].to_hash
# => {:key_4=>{:subkey_1=>1, :subkey_2=>2}, :key_3=>[1, 2, 3], :key_2=>2, :key_1=>1}
```

If you want to keep it simple, you can add a method to the `Hash` class.

```ruby
class Hash

  def reverse
    Hash[self.to_a.reverse]
  end

end
```

Then you could do this:

```ruby
my_hash.reverse
# => {:key_4=>{:subkey_1=>1, :subkey_2=>2}, :key_3=>[1, 2, 3], :key_2=>2, :key_1=>1}
```
