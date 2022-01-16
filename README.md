# react-native-video-thumbnail-too

extracts a png thumbnail from a video

## Installation

```sh
npm install react-native-video-thumbnail-too
npx react-native link react-native-video-thumbnail-too
```

## Usage

```js
import { extractThumbnail } from "react-native-video-thumbnail-too";

// ...

const resp = await extractThumbnail(pathToVideoFile, timeInMilliseconds);
/*
resp is 
{
    uri: string,
    width: number,
    height: number
}
*/
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
