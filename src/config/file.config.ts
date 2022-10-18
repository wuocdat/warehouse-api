export const MAX_UPLOAD_FILE_SIZE = 1024 * 1024;

export const UPLOAD_PATH = {
  path: 'public/uploads/',
};

export const TEMPLATE_FILE = {
  headers: [
    'Tên sản phẩm',
    'Loại sản phẩm',
    'Nhãn hiệu',
    'Mã Sản Phẩm',
    'Barcode',
    'Khối lượng',
    'Đơn vị khối lượng',
    'Đơn vị',
    'Số ngày cảnh báo hết hạn',
    'Áp dụng thuế	',
    'Giá áp dụng thuế	',
    'Thuế đầu vào (%)',
    'Thuế đầu ra (%)',
    'Tồn kho',
    'Điểm lưu kho',
    'Giá bán buôn',
    'Giá nhập',
    'Giá bán lẻ',
  ],
  colCount: 18,
  require: [0, 1, 2, 7, 9, 15, 16, 17],
};

export enum PropsPositionEnum {
  NAME = 1,
  PRODUCT_TYPE = 2,
  BRAND = 3,
  CODE = 4,
  BARCODE = 5,
  WEIGHT = 6,
  WEIGHT_UNIT = 7,
  UNIT = 8,
  EXPIRE = 9,
  TAX = 10,
  TAX_PRICE = 11,
  IMPORT_TAX = 12,
  EXPORT_TAX = 13,
  QUANTITY = 14,
  PRODUCT_PLACE = 15,
  WHOLE_SALE_PRICE = 16,
  IMPORT_PRICE = 17,
  RETAIL_PRICE = 18,
}
