const product = require ('../models/product')
exports.read = async (req, res) => {
    try {
        const id = req.params.id;
        const oneProduct = await product.findById(id).exec();

        if (!oneProduct) {
            return res.status(404).send('Product not found');
        }

        res.json(oneProduct);
    } catch (err) {
        console.log(err);
        res.status(500).send('server error');
    }
}

exports.list = async (req, res) => {
    try {
        const producted = await product.find({}).exec();
        res.json(producted) // ส่งข้อมูลสินค้าออกไป
    } catch (err) {
        console.log(err)
        res.status(500).send('server error')
    }
}
exports.create = async (req, res) => {
  try {
    console.log(req.body); // ตรวจสอบข้อมูลที่ส่งมา
    const producted = await new product(req.body).save()
    res.json(producted); // ส่งข้อมูลกลับไปให้ client ดูเลย
  } catch (err) {
    console.log(err)
    res.status(500).send('server error')
  }
}

exports.update = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedProduct = await product.findByIdAndUpdate(id, req.body, {
            new: true,        // ให้ส่งค่าที่อัปเดตกลับ
            runValidators: true // ตรวจสอบตาม schema
        }).exec();

        if (!updatedProduct) {
            return res.status(404).send('Product not found');
        }

        res.json(updatedProduct);
    } catch (err) {
        console.log(err);
        res.status(500).send('server error');
    }
}
exports.remove = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedProduct = await product.findByIdAndDelete(id).exec();

        if (!deletedProduct) {
            return res.status(404).send('Product not found');
        }

        res.json({
            message: 'Product deleted successfully',
            deleted: deletedProduct
        });
    } catch (err) {
        console.log(err);
        res.status(500).send('server error');
    }
}