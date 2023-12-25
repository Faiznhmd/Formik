import Textcolor from './Textcolor';
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FieldArray,
  FastField,
} from 'formik';
import * as Yup from 'yup';

const initialValues = {
  name: '',
  email: '',
  channel: '',
  comments: '',
  address: '',
  social: {
    facebook: '',
    twitter: '',
  },
  phoneNumbers: ['', ''],
  phNumbers: [''],
};

const onSubmit = (values) => {
  console.log('Form data', values);
};

// const validate = (values) => {
// //   let errors = {};
// //   if (!values.name) {
// //     errors.name = 'Required';
// //   }

// //   if (!values.email) {
// //     errors.email = 'Required';
// //   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
// //     errors.email = 'Invalid email format';
// //   }
// //   if (!values.channel) {
// //     errors.channel = 'Required';
// //   }
// //   return errors;
// // };

const validationSchema = Yup.object({
  name: Yup.string().required('Required!'),
  email: Yup.string().email('Invalid email address').required('Required!'),
  channel: Yup.string().required('Required!'),
  comments: Yup.string().required('Required!'),
});

const validateComments = (value) => {
  let error;
  if (!value) {
    error = 'Required';
  }
  return error;
};

const Youtubeform = () => {
  // console.log('visited fields', formik.touched);
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      // validateOnChange={false}
      // validateOnBlur={false}
    >
      <Form>
        <div className="form-control">
          {/* for name */}
          <label htmlFor="name">Name</label>
          <Field type="text" id="name" name="name" />
          <ErrorMessage name="name" component={Textcolor} />
        </div>
        {/* for email */}
        <div className="form-control">
          <label htmlFor="email">E-mail</label>
          <Field type="text" id="email" name="email" />
          <ErrorMessage name="email">
            {(errormsg) => <div className="error">{errormsg}</div>}
          </ErrorMessage>
        </div>

        {/* fro channel */}
        <div className="form-control">
          <label htmlFor="channel">Channel Name</label>
          <Field type="text" id="channel" name="channel" />
          <ErrorMessage name="channel" component={Textcolor} />
        </div>

        {/* comments */}
        <div className="form-control">
          <label htmlFor="comments">Comments</label>
          <Field
            as="textarea"
            type="text"
            id="comments"
            name="comments"
            validate={validateComments}
          />
          <ErrorMessage name="comments" component={Textcolor} />
        </div>
        <div className="form-control">
          <label htmlFor="address">Address</label>
          <FastField name="address">
            {/* console.log(Field render) */}
            {(props) => {
              const { field, form, meta } = props;
              console.log('Render props', props);
              return (
                <div>
                  <input type="text" id="address" {...field} />
                  {meta.touched && meta.error ? <div> {meta.error}</div> : null}
                </div>
              );
            }}
          </FastField>
        </div>

        <div className="form-control">
          <label htmlFor="facebook">Facebook Profile</label>
          <Field type="text" id="facebook" name="social.facebook" />
        </div>
        <div className="form-control">
          <label htmlFor="twitter">Twitter Profile</label>
          <Field type="text" id="twitter" name="social.twitter" />
        </div>
        <div className="form-control">
          <label htmlFor="primaryPh">Primary Phone Number</label>
          <Field type="text" id="primaryPh" name="phoneNumbers[0]" />
        </div>
        <div className="form-control">
          <label htmlFor="secondaryPh">Secondary Phone Number</label>
          <Field type="text" id="secondaryPh" name="phoneNumbers[1]" />
        </div>

        <div className="form-control">
          <label htmlFor="">List of Phone Numbers</label>
          <FieldArray name="phNumbers">
            {(fieldArrayProps) => {
              const { push, remove, form } = fieldArrayProps;
              const { values } = form;
              const { phNumbers } = values;
              console.log('Form errors', form.errors);

              return (
                <div>
                  {phNumbers.map((phNumber, index) => (
                    <div key={index}>
                      <Field name={`phNumber[${index}]`} />
                      {index > 0 && (
                        <button type="button" onClick={() => remove(index)}>
                          -
                        </button>
                      )}

                      <button type="button" onClick={() => push('')}>
                        +
                      </button>
                    </div>
                  ))}
                </div>
              );
            }}
          </FieldArray>
        </div>
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};

export default Youtubeform;

// onchange onblur value is repeating continously in input so we can replace it on getfieldprops
// form to Form
// input to field
