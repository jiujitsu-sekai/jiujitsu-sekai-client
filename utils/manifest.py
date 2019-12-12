import os
import os.path
import json
from typing import List

SCENE_PATH='../src/scenes'

MANIFEST_SETTING = {
  "version" : 1,
  "enableSceneOffline" : True,
  "enableTexturesOffline" : True
}

class ManifestCreator:
    @staticmethod
    def _get_babylon_files() -> List[str]:
        res = []
        for filename in os.listdir(SCENE_PATH):
            if filename.endswith('.babylon'):
                res.append(filename)

        return res

    @classmethod
    def createManifest(cls):
        content = json.dumps(MANIFEST_SETTING)
        for filename in cls._get_babylon_files():
            manifest = os.path.sep.join([SCENE_PATH, filename + '.manifest'])
            print("Writing " + manifest)
            with open(manifest, 'w') as f:
                f.write(content)

if __name__ == "__main__":
    ManifestCreator.createManifest()