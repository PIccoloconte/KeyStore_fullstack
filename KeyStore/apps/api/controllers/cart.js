import { Cart } from "../models/cart.js";

export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id }).populate(
      "items.gameId"
    );
    if (!cart) {
      return res.status(200).json({ items: [] });
    }
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addToCart = async (req, res) => {
  const { gameId, price, title, imageUrl, platform } = req.body;

  try {
    let cart = await Cart.findOne({ userId: req.user.id });

    if (!cart) {
      cart = new Cart({
        userId: req.user.id,
        items: [{ gameId, price, title, imageUrl, platform }],
      });
    } else {
      const itemIndex = cart.items.findIndex(
        (item) => item.gameId.toString() === gameId
      );
      if (itemIndex > -1) {
        // aggiorna quantità
        cart.items[itemIndex].quantity += 1;
      } else {
        // aggiungi nuovo item
        cart.items.push({ gameId, price, title, imageUrl, platform });
      }
    }

    cart.updatedAt = new Date();
    await cart.save();

    // Recuperiamo il carrello popolato prima di inviarlo come risposta
    const populatedCart = await Cart.findById(cart._id).populate(
      "items.gameId"
    );

    res.status(200).json(populatedCart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteGameFromCart = async (req, res) => {
  const { gameId } = req.params;

  try {
    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) return res.status(404).json({ message: "Carrello non trovato" });

    cart.items = cart.items.filter((item) => item.gameId.toString() !== gameId);
    cart.updatedAt = new Date();
    await cart.save();

    // Recuperiamo il carrello popolato prima di inviarlo come risposta
    const populatedCart = await Cart.findById(cart._id).populate(
      "items.gameId"
    );

    res.status(200).json(populatedCart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) return res.status(404).json({ message: "Carrello non trovato" });

    cart.items = [];
    cart.updatedAt = new Date();
    await cart.save();

    // Recuperiamo il carrello popolato prima di inviarlo come risposta
    const populatedCart = await Cart.findById(cart._id).populate(
      "items.gameId"
    );

    res.status(200).json(populatedCart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
