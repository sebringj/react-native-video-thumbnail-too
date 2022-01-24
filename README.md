# react-native-video-thumbnail-too

extracts a jpg thumbnail from a video

## Installation

```sh
yarn add react-native-video-thumbnail-too
npx react-native link react-native-video-thumbnail-too
```
### IOS
```sh
cd ios && pod install
```

## Usage

```js
import { extractThumbnail } from "react-native-video-thumbnail-too";

const { uri, width, height } = await extractThumbnail(
    pathToVideoFile,
    timeInMilliseconds, // default 0
    quality // default 100
);
```

## Need anything custom?

https://www.jasonsebring.com/contact

## Tip Jar

https://www.jasonsebring.com/pay

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
