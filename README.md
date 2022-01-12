# react-native-video-thumbnail-too

extracts a png thumbnail from a video

## Installation

```sh
npm install react-native-video-thumbnail-too
```

## Usage

```js
import { extractThumbnail } from "react-native-video-thumbnail-too";

// ...

// defaults to start at time 0, will respond with thumbnailPath of dimensions matching video
const thumbnailPath = await extractThumbnail(pathToVideoFile, timeInMilliseconds);
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
