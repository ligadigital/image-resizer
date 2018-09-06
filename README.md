# Image Resizer

[![Build Status](https://travis-ci.org/ligadigital/image-resizer.svg?branch=master)](https://travis-ci.org/ligadigital/image-resizer)

## Usage

```
GET /:mode/:size/:path
```


### Modes

Must be one of the following:

* `resize`
* `crop`
* `resizefit`
* `resizefitgray`
* `shrink`


### Size

Must be in one of the following formats:

* `100x100` (width and height)
* `100x`    (width only)
* `x100`    (height only)

### Examples

```
GET /crop/100x100/example.org/my-image.jpeg
```

### S3

If a S3 bucket is configured the process works like this:

* Request app requests image from `S3` bucket
* **If the image does not exist**, `S3` redirects to the image-resizer
  * `ln-image-resizer` resizes the image un puts it on `S3`
  * `ln-image-resizer` redirects back to `S3`
* **If the image exist**, `S3` serves the image

**Example s3 Routing rule**

```XML
<RoutingRules>
  <RoutingRule>
    <Condition>
      <KeyPrefixEquals>image-resizer/</KeyPrefixEquals>
      <HttpErrorCodeReturnedEquals>404</HttpErrorCodeReturnedEquals>
    </Condition>
    <Redirect>
      <Protocol>https</Protocol>
      <HostName>example.org</HostName>
      <ReplaceKeyPrefixWith>image-resizer/</ReplaceKeyPrefixWith>
      <HttpRedirectCode>302</HttpRedirectCode>
    </Redirect>
  </RoutingRule>
</RoutingRules>
```


## Configureation

All configuration is done via enviroment variables:

- **S3_BUCKET** (e.g. `ligacloud-ligaos-test-static`)
- **S3_PATH"**  (e.g. `ln-image-resizer`)
- **S3_URL**    (e.g. `http://ligacloud-ligaos-test-static.s3-website.eu-central-1.amazonaws.com`)
- **S3_ACCESS_KEY_ID**
- **S3_SECRET_ACCESS_KEY**


## Dependencies

* [ImageMagick](http://www.imagemagick.org/)
* [GraphicsMagick](http://www.graphicsmagick.org/)
* [gifsicle](https://www.lcdf.org/gifsicle/)


On Mac:

```
brew install imagemagick
brew install graphicsmagick
brew install gifsicle
```

## TODOs

* [ ] Make tmp/ dir configurable
* [ ] Docker container
* [ ] Better documentation
* [ ] Drop node 4 support
