import React from 'react';
import { Formik, FormikActions, Form, Field, FormikProps, FieldProps } from 'formik';
import * as Yup from 'yup';
import { Input, Textarea, Radio, RadioGroup, FormLabel, Checkbox, Stack, Box, Button } from '@chakra-ui/core';
import { navigate } from '@reach/router';
import api, { WineType, useAsyncFetch } from '../api';

// types
type WinesProps = {
  path?: string;
};

type WineFormValues = Omit<WineType, 'id'>;

// schema
const WhineSchema = Yup.object().shape({
  name: Yup.string()
    .max(40, 'Name is too long!')
    .required('Required'),
  region: Yup.string()
    .max(40, 'Region is too long!')
    .required('Required'),
  description: Yup.string()
    .min(50, 'Description is too short')
    .max(450, 'Description is too long!')
    .required('Required'),
  type: Yup.string().required('Required'),
  grapes: Yup.array().min(1, 'Select at least one option'),
  image: Yup.object().shape({
    url: Yup.string()
      .required('Required')
      .url('insert a valid url')
  })
});

const defaultWine: WineFormValues = {
  description: '', // done
  image: { url: '' }, // done
  liked: false,
  name: '', // done
  region: '', // done
  grapes: [], // done
  type: '' // done
};

const WineAdd: React.FC<WinesProps> = props => {
  const [types] = useAsyncFetch('getTypes', {}, []);
  const [grapes] = useAsyncFetch('getGrapes', {}, []);

  return (
    <Formik
      initialValues={defaultWine}
      validationSchema={WhineSchema}
      onSubmit={async (values: WineFormValues, actions: FormikActions<WineFormValues>) => {
        try {
          const response = await api.insertWine(values);
          response.success && navigate(`/wine/${response.wine.id}`);
        } catch (e) {
          console.error(e);
        }
      }}
      render={(formikBag: FormikProps<WineFormValues>) => {
        return (
          <Form>
            <Box as='h2' marginTop={0} marginBottom='5' textAlign='center'>
              Add a bottle of wine
            </Box>
            <Field
              name='name'
              render={({ field, form }: FieldProps<WineFormValues>) => (
                <React.Fragment>
                  <Input
                    type='text'
                    {...field}
                    aria-label='Wine Name'
                    focusBorderColor='red.300'
                    errorBorderColor='red.500'
                    placeholder='Name'
                  />
                  <Box as='p' color='red.500' margin={0}>
                    {form.touched.name && form.errors.name && form.errors.name}
                  </Box>
                </React.Fragment>
              )}
            />

            <Field
              name='region'
              render={({ field, form }: FieldProps<WineFormValues>) => (
                <React.Fragment>
                  <Input
                    type='text'
                    {...field}
                    aria-label='Wine Region'
                    marginTop={5}
                    focusBorderColor='red.300'
                    errorBorderColor='red.500'
                    placeholder='Region'
                  />
                  <Box as='p' color='red.500' margin={0}>
                    {form.touched.region && form.errors.region && form.errors.region}
                  </Box>
                </React.Fragment>
              )}
            />

            <Field
              name='description'
              render={({ field, form }: FieldProps<WineFormValues>) => (
                <React.Fragment>
                  <Textarea
                    {...field}
                    aria-label='Wine Description'
                    marginTop={5}
                    focusBorderColor='red.300'
                    errorBorderColor='red.500'
                    placeholder='Description'
                    size='lg'
                    resize='none'
                  />
                  <Box as='p' color='red.500' margin={0}>
                    {form.touched.description && form.errors.description && form.errors.description}
                  </Box>
                </React.Fragment>
              )}
            />

            <Field
              name='type'
              render={({ field, form }: FieldProps<WineFormValues>) => (
                <React.Fragment>
                  <FormLabel htmlFor='type' marginTop={5}>
                    Type
                  </FormLabel>
                  <RadioGroup {...field} id='type' spacing={5} isInline display='flex' justifyContent='space-evenly'>
                    {types &&
                      types.map((t: { id: number; name: string }) => (
                        <Radio key={t.id} variantColor='red' isChecked={t.name === field.value} value={t.name}>
                          {t.name}
                        </Radio>
                      ))}
                  </RadioGroup>

                  <Box as='p' color='red.500' margin={0}>
                    {form.touched.type && form.errors.type && form.errors.type}
                  </Box>
                </React.Fragment>
              )}
            />

            <Field
              name='grapes'
              render={({ field, form }: FieldProps<WineFormValues>) => (
                <React.Fragment>
                  <FormLabel htmlFor='grapes' marginTop={5}>
                    Grapes
                  </FormLabel>
                  <Stack id='grapes' spacing={5} isInline display='flex' justifyContent='space-evenly'>
                    {grapes &&
                      grapes.map((g: { id: number; name: string }) => (
                        <Checkbox
                          key={g.id}
                          size='md'
                          variantColor='red'
                          name={field.name}
                          value={g.name}
                          onBlur={field.onBlur}
                          isChecked={field.value.includes(g.name)}
                          onChange={(e: React.ChangeEvent & { target: { checked: boolean } }) => {
                            formikBag.setFieldValue(
                              field.name,
                              e.target.checked
                                ? [...field.value, g.name]
                                : field.value.filter((v: string) => v !== g.name)
                            );
                          }}
                        >
                          {g.name}
                        </Checkbox>
                      ))}
                  </Stack>
                  <Box as='p' color='red.500' margin={0}>
                    {form.touched.grapes && form.errors.grapes && form.errors.grapes}
                  </Box>
                </React.Fragment>
              )}
            />

            <Field
              name='image.url'
              render={({ field, form }: FieldProps<WineFormValues>) => {
                const previewImage =
                  form.touched.image && form.touched.image.url && !(form.errors.image && form.errors.image.url);

                return (
                  <React.Fragment>
                    <Input
                      type='text'
                      {...field}
                      aria-label='Wine Region'
                      marginTop={5}
                      focusBorderColor='red.300'
                      errorBorderColor='red.500'
                      placeholder='Insert image url here'
                    />

                    {previewImage && (
                      <Box as='figure' marginTop={5} display='flex' justifyContent='center'>
                        <img src={field.value} alt='wine-bottle' />
                      </Box>
                    )}
                    <Box as='p' color='red.500' margin={0}>
                      {form.touched.image && form.touched.image && form.errors.image && form.errors.image.url}
                    </Box>
                  </React.Fragment>
                );
              }}
            />

            <Button variantColor='green' type='submit' float='right' marginTop={10}>
              Save
            </Button>
          </Form>
        );
      }}
    />
  );
};

export default WineAdd;
