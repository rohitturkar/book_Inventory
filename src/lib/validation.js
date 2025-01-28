import * as Yup from 'yup';

export const bookSchema = Yup.object({
    title: Yup.string().min(1, 'Title is required').required('Title is required'),
    authors: Yup.string().min(1, 'Author is required').required('Author is required'),  
    isbn13: Yup.string().required('ISBN is required'),  
    publisher: Yup.string().required('Publisher is required'),
    price: Yup.string().required('Price is required'),
    stockQuantity: Yup.number().min(0, 'Stock quantity cannot be negative').integer('Stock quantity must be an integer').required('Stock quantity is required'),
    publishedDate: Yup.date().required('Published Date is required'),
    desc:Yup.string().required('Description is required')
});
