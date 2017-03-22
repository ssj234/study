import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

import java.io.File;


public class Write {

	/**
	 * @param args
	 * @throws IOException 
	 */
	public static void main(String[] args) throws IOException {
		
		File file=new File("E:\\go\\2323.txt");
		
		FileOutputStream os=new FileOutputStream(file);
		os.write("dsdsd".getBytes());
	}

}
